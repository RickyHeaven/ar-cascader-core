import { defineComponent as w, computed as N, resolveComponent as E, openBlock as F, createBlock as j } from "vue";
import { find as v } from "lodash-es";
import z from "@zhangqingcq/china-area-data";
const $ = /* @__PURE__ */ w({
  __name: "ArCascader",
  props: {
    modelValue: { default: () => [] },
    level: { default: 2 },
    dataType: { default: "all" },
    disabled: { type: Boolean, default: !1 },
    size: {},
    placeholder: {},
    renderFormat: { type: Function, default: (h) => h.join("/") },
    changeOnSelect: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "on-change"],
  setup(h, { emit: B }) {
    const g = B, t = h;
    let d = [];
    const y = (e) => {
      if (typeof e == "number" && (e = e.toString()), e.length < 12) {
        const l = [...e];
        for (; l.length < 12; )
          l.push("0");
        return Number(l.join(""));
      }
      return Number(e);
    }, V = N({
      get() {
        var l, a, r, o, u, i, s, c;
        let e = [];
        return (a = (l = t.modelValue) == null ? void 0 : l.every) != null && a.call(l, (n) => /^[\u4e00-\u9fa5]+$/.test(n)) ? e = f(t.modelValue, "label", "value") : (o = (r = t.modelValue) == null ? void 0 : r.every) != null && o.call(r, (n) => /^\d+$/.test(n)) ? e = t.modelValue.map(y) : (i = (u = t.modelValue) == null ? void 0 : u.every) != null && i.call(u, (n) => n == null ? void 0 : n.hasOwnProperty("code")) ? e = f(
          t.modelValue.map((n) => ({
            code: y(n.code),
            name: n.name
          })),
          "value",
          "value",
          "code"
        ) : (c = (s = t.modelValue) == null ? void 0 : s.every) != null && c.call(s, (n) => n == null ? void 0 : n.hasOwnProperty("name")) && (e = f(t.modelValue, "label", "value", "name")), d = e, e;
      },
      set(e) {
        if (e = e.map((a) => typeof a == "string" ? Number(a) : a), S(e))
          return;
        let l = [];
        t.dataType === "all" ? l = f(e, "value", "all") : t.dataType === "code" ? l = e : t.dataType === "name" && (l = f(e, "value", "label")), g("update:modelValue", l), g("on-change", l);
      }
    }), O = N(() => {
      const e = [];
      return z.forEach((l) => {
        const a = {
          label: l.label,
          value: l.value
        };
        Number(t.level) > 0 && (a.children = [], l.children.forEach((r) => {
          const o = {
            label: r.label,
            value: r.value
          };
          Number(t.level) > 1 && (o.children = [], r.children.forEach((u) => {
            o.children.push({
              label: u.label,
              value: u.value
            });
          })), a.children.push(o);
        })), e.push(a);
      }), e;
    });
    function f(e, l, a, r) {
      var n, _, C;
      const o = [];
      let u, i, s;
      r ? (u = (n = e[0]) == null ? void 0 : n[r], i = (_ = e[1]) == null ? void 0 : _[r], s = (C = e[2]) == null ? void 0 : C[r]) : (u = e[0], i = e[1], s = e[2]);
      const c = v(z, (m) => m[l] === u);
      if (c) {
        if (b(o, c, a), t.level === 0 || i === void 0)
          return o;
        const m = v(c.children, (p) => p[l] === i);
        if (m) {
          if (b(o, m, a), t.level === 1 || s === void 0)
            return o;
          const p = v(m.children, (T) => T[l] === s);
          if (p)
            return b(o, p, a), o;
        }
      }
      return [];
    }
    function b(e, l, a) {
      a === "label" || a === "value" ? e.push(l[a]) : e.push({
        code: l.value,
        name: l.label
      });
    }
    function S(e) {
      return (e == null ? void 0 : e.length) === 0 ? (d == null ? void 0 : d.length) === 0 : (d == null ? void 0 : d.length) === 0 ? !1 : e.every((l, a) => l === (d == null ? void 0 : d[a]));
    }
    return (e, l) => {
      const a = E("Cascader");
      return F(), j(a, {
        modelValue: V.value,
        "onUpdate:modelValue": l[0] || (l[0] = (r) => V.value = r),
        data: O.value,
        disabled: t.disabled,
        size: t.size,
        placeholder: t.placeholder,
        "render-format": t.renderFormat,
        "change-on-select": t.changeOnSelect,
        transfer: "",
        filterable: ""
      }, null, 8, ["modelValue", "data", "disabled", "size", "placeholder", "render-format", "change-on-select"]);
    };
  }
});
export {
  $ as default
};
