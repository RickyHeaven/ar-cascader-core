import { defineComponent as w, computed as z, resolveComponent as E, openBlock as F, createBlock as j } from "vue";
import { find as b } from "lodash-es";
import B from "@zhangqingcq/china-area-data";
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
  setup(h, { emit: N }) {
    const g = N, a = h;
    let d = [];
    const V = (e) => {
      if (typeof e == "number" && (e = e.toString()), e.length < 12) {
        const l = [...e];
        for (; l.length < 12; )
          l.push("0");
        return Number(l.join(""));
      }
      return Number(e);
    }, y = z({
      get() {
        var l, t, r, o, u, c, s, i;
        let e = [];
        return (t = (l = a.modelValue) == null ? void 0 : l.every) != null && t.call(l, (n) => /^[\u4e00-\u9fa5]+$/.test(n)) ? e = f(a.modelValue, "label", "value") : (o = (r = a.modelValue) == null ? void 0 : r.every) != null && o.call(r, (n) => /^\d+$/.test(n)) ? e = a.modelValue.map(V) : (c = (u = a.modelValue) == null ? void 0 : u.every) != null && c.call(u, (n) => n == null ? void 0 : n.hasOwnProperty("code")) ? e = f(
          a.modelValue.map((n) => ({
            code: V(n.code),
            name: n.name
          })),
          "value",
          "value",
          "code"
        ) : (i = (s = a.modelValue) == null ? void 0 : s.every) != null && i.call(s, (n) => n == null ? void 0 : n.hasOwnProperty("name")) && (e = f(a.modelValue, "label", "value", "name")), d = e, e;
      },
      set(e) {
        if (S(e))
          return;
        let l = [];
        a.dataType === "all" ? l = f(e, "value", "all") : a.dataType === "code" ? l = e : a.dataType === "name" && (l = f(e, "value", "label")), g("update:modelValue", l), g("on-change", l);
      }
    }), O = z(() => {
      const e = [];
      return B.forEach((l) => {
        const t = {
          label: l.label,
          value: l.value
        };
        Number(a.level) > 0 && (t.children = [], l.children.forEach((r) => {
          const o = {
            label: r.label,
            value: r.value
          };
          Number(a.level) > 1 && (o.children = [], r.children.forEach((u) => {
            o.children.push({
              label: u.label,
              value: u.value
            });
          })), t.children.push(o);
        })), e.push(t);
      }), e;
    });
    function f(e, l, t, r) {
      var n, _, C;
      const o = [];
      let u, c, s;
      r ? (u = (n = e[0]) == null ? void 0 : n[r], c = (_ = e[1]) == null ? void 0 : _[r], s = (C = e[2]) == null ? void 0 : C[r]) : (u = e[0], c = e[1], s = e[2]);
      const i = b(B, (m) => m[l] === u);
      if (i) {
        if (v(o, i, t), a.level === 0 || c === void 0)
          return o;
        const m = b(i.children, (p) => p[l] === c);
        if (m) {
          if (v(o, m, t), a.level === 1 || s === void 0)
            return o;
          const p = b(m.children, (T) => T[l] === s);
          if (p)
            return v(o, p, t), o;
        }
      }
      return [];
    }
    function v(e, l, t) {
      t === "label" || t === "value" ? e.push(l[t]) : e.push({
        code: l.value,
        name: l.label
      });
    }
    function S(e) {
      return (e == null ? void 0 : e.length) === 0 ? (d == null ? void 0 : d.length) === 0 : (d == null ? void 0 : d.length) === 0 ? !1 : e.every((l, t) => l === (d == null ? void 0 : d[t]));
    }
    return (e, l) => {
      const t = E("Cascader");
      return F(), j(t, {
        modelValue: y.value,
        "onUpdate:modelValue": l[0] || (l[0] = (r) => y.value = r),
        data: O.value,
        disabled: a.disabled,
        size: a.size,
        placeholder: a.placeholder,
        "render-format": a.renderFormat,
        "change-on-select": a.changeOnSelect,
        transfer: ""
      }, null, 8, ["modelValue", "data", "disabled", "size", "placeholder", "render-format", "change-on-select"]);
    };
  }
});
export {
  $ as default
};
