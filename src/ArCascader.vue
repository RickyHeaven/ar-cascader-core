<script lang="ts" setup>
	import { computed, onMounted, ref, watch } from 'vue'
	import { pca, pcaa } from 'area-data'

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

	const selectData = ref<any[]>([])
	const select = ref<any[]>([])
	let oldData: any[] = []
	const showLevel = computed(() => parseInt(String(props.level)))

	function levelShow(level: number, code: string) {
		if (level === 2) {
			return Object.keys(pca['86']).indexOf(code) > -1
		}
	}

	function getIndex(list: Record<string, any>, name: string) {
		for (const i in list) {
			if (list[i] === name) {
				return i
			}
		}
		return ''
	}

	function init() {
		let proData: any[] = []
		for (const p in pca['86']) {
			let proItem: Record<string, any> = {
				value: p,
				label: pca['86'][p],
				children: []
			}
			if (showLevel.value > 0 && pcaa[p]) {
				proItem.loading = false
			}
			proData.push(proItem)
		}
		selectData.value = proData
	}

	function setDefaultValue() {
		if (props.modelValue[0]) {
			let _select: any[] = []
			if (isNaN(parseInt(props.modelValue[0]))) {
				let i = 0
				let index: string = ''
				while (props.modelValue[i] && i <= showLevel.value) {
					if (i === 0) {
						index = getIndex(pca['86'], props.modelValue[0])
					} else {
						index = getIndex(pcaa[index], props.modelValue[i])
					}
					_select.push(index)
					i++
				}
				select.value = _select
			} else {
				select.value = props.modelValue
			}
			let res = processValue(select.value)
			oldData = res
			emit('update:modelValue', res)
			emit('on-change', res)
		}
	}

	function canEmit(res: any[]) {
		let ifEmit = false
		if (props.modelValue && props.modelValue.length !== 0) {
			if (typeof res[0] === 'string') {
				if (props.modelValue[props.modelValue.length - 1] !== oldData[oldData.length - 1]) {
					ifEmit = true
				}
			} else {
				if (
					oldData &&
					oldData.length !== 0 &&
					props.modelValue[props.modelValue.length - 1].code !== oldData[oldData.length - 1].code
				) {
					ifEmit = true
				}
			}
		} else {
			ifEmit = true
		}
		return ifEmit
	}

	function handleChange(resArr: any[]) {
		let res = processValue(resArr)
		oldData = res
		emit('update:modelValue', res)
		emit('on-change', res)
	}

	function loadData(item: Record<string, any>, callback: () => void) {
		let childData = []
		let children = pcaa[item.value]
		for (const c in children) {
			if (children.hasOwnProperty(c)) {
				let child: Record<string, any> = {
					value: c,
					label: pcaa[item.value][c],
					children: []
				}
				if (pcaa[child.value] && levelShow(showLevel.value, item.value)) {
					child.loading = false
				}
				childData.push(child)
				item.children = childData
			}
		}
		item.loading = false
		callback()
	}

	function processValue(arr: any[]) {
		let i = 0
		let res = []
		while (arr[i]) {
			let name = ''
			if (i === 0) {
				name = pca['86'][arr[i]]
			} else {
				name = pcaa[arr[i - 1]][arr[i]]
			}
			let item
			if (props.dataType === 'all') {
				item = {
					code: arr[i],
					name: name
				}
			} else if (props.dataType === 'name') {
				item = name
			} else {
				item = arr[i]
			}
			res.push(item)
			i++
		}
		return res
	}

	onMounted(() => {
		init()
		if (canEmit(props.modelValue)) {
			setDefaultValue()
		}
	})

	watch(
		() => props.modelValue,
		() => {
			if (canEmit(props.modelValue)) {
				setDefaultValue()
			}
		},
		{
			deep: true
		}
	)
</script>

<template>
	<Cascader
		v-model="select"
		:data="selectData"
		:load-data="loadData"
		transfer
		:disabled="props.disabled"
		:size="props.size"
		:placeholder="props.placeholder"
		:render-format="props.renderFormat"
		:change-on-select="props.changeOnSelect"
		@on-change="handleChange"
	/>
</template>
