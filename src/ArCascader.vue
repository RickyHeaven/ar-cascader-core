<script lang="ts" setup>
	import { computed } from 'vue'
	import { find } from 'lodash-es'
	import areaData from '@zhangqingcq/china-area-data'

	const emit = defineEmits(['update:modelValue', 'on-change'])
	const props = withDefaults(
		defineProps<{
			modelValue?: any[]
			level?: 0 | 1 | 2 | '0' | '1' | '2'
			dataType?: 'all' | 'code' | 'name'
			disabled?: boolean
			size?: 'large' | 'small'
			placeholder?: string
			renderFormat?: (label: string[]) => string
			changeOnSelect?: boolean
		}>(),
		{
			modelValue: () => [],
			level: 2,
			dataType: 'all',
			disabled: false,
			renderFormat: (label: string[]) => label.join('/'),
			changeOnSelect: false
		}
	)

	let oldValue: any[] = []
	const amend = (d: number | string) => {
		if (typeof d === 'number') {
			d = d.toString()
		}
		if (d.length < 12) {
			const t = [...d]
			while (t.length < 12) {
				t.push('0')
			}
			return Number(t.join(''))
		}
		return Number(d)
	}
	const select = computed({
		get() {
			let t = []
			if (props.modelValue?.every?.((e) => /^[\u4e00-\u9fa5]+$/.test(e))) {
				t = getValue(props.modelValue, 'label', 'value')
			} else if (props.modelValue?.every?.((e) => /^\d+$/.test(e))) {
				t = props.modelValue.map(amend)
			} else if (props.modelValue?.every?.((e) => e?.hasOwnProperty('code'))) {
				t = getValue(
					props.modelValue.map((e) => ({
						code: amend(e.code),
						name: e.name
					})),
					'value',
					'value',
					'code'
				)
			} else if (props.modelValue?.every?.((e) => e?.hasOwnProperty('name'))) {
				t = getValue(props.modelValue, 'label', 'value', 'name')
			}
			oldValue = t
			return t
		},
		set(v) {
			if (isSame(v)) {
				return
			}
			let t = []
			if (props.dataType === 'all') {
				t = getValue(v, 'value', 'all')
			} else if (props.dataType === 'code') {
				t = v
			} else if (props.dataType === 'name') {
				t = getValue(v, 'value', 'label')
			}
			emit('update:modelValue', t)
			emit('on-change', t)
		}
	})
	const selectData = computed(() => {
		const t: Record<string, any>[] = []
		areaData.forEach((e1: Record<string, any>) => {
			const l1: Record<string, any> = {
				label: e1.label,
				value: e1.value
			}
			if (Number(props.level) > 0) {
				l1.children = []
				e1.children.forEach((e2: Record<string, any>) => {
					const l2: Record<string, any> = {
						label: e2.label,
						value: e2.value
					}
					if (Number(props.level) > 1) {
						l2.children = []
						e2.children.forEach((e3: Record<string, any>) => {
							l2.children.push({
								label: e3.label,
								value: e3.value
							})
						})
					}
					l1.children.push(l2)
				})
			}
			t.push(l1)
		})
		return t
	})

	function getValue(v: any[], key: string, type: string, source?: string) {
		const t: any[] = []
		let _v0: any, _v1: any, _v2: any
		if (source) {
			_v0 = v[0]?.[source]
			_v1 = v[1]?.[source]
			_v2 = v[2]?.[source]
		} else {
			_v0 = v[0]
			_v1 = v[1]
			_v2 = v[2]
		}
		const l1 = find(areaData, (_e) => _e[key] === _v0)
		if (l1) {
			setResult(t, l1, type)
			if (props.level === 0 || _v1 === undefined) {
				return t
			}
			const l2 = find(l1.children, (_e) => _e[key] === _v1)
			if (l2) {
				setResult(t, l2, type)
				if (props.level === 1 || _v2 === undefined) {
					return t
				}
				const l3 = find(l2.children, (_e) => _e[key] === _v2)
				if (l3) {
					setResult(t, l3, type)
					return t
				}
			}
		}
		return []
	}

	function setResult(t: any[], v: Record<string, any>, type: string) {
		if (type === 'label' || type === 'value') {
			t.push(v[type])
		} else {
			t.push({
				code: v.value,
				name: v.label
			})
		}
	}

	function isSame(t: Array<number | string>) {
		if (t?.length === 0) {
			return oldValue?.length === 0
		}
		if (oldValue?.length === 0) {
			return false
		}
		return t.every((e, i) => e === oldValue?.[i])
	}
</script>

<template>
	<Cascader
		v-model="select"
		:data="selectData"
		:disabled="props.disabled"
		:size="props.size"
		:placeholder="props.placeholder"
		:render-format="props.renderFormat"
		:change-on-select="props.changeOnSelect"
		transfer
	/>
</template>
