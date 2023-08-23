import { DefineComponent } from 'vue'

type _level = '0' | '1' | '2' | 0 | 1 | 2

declare const ArCascader: DefineComponent<{
	modelValue?: any[]
	level?: _level
	dataType?: 'all' | 'code' | 'name'
	disabled?: boolean
	size?: 'large' | 'small'
	placeholder?: string
	renderFormat?: (label: string) => string
	changeOnSelect?: boolean
	onOnChange?: (d: any[]) => void
}>

export default ArCascader
