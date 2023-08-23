<script lang="ts" setup>
	import { ref } from 'vue'
	import ArCascader from '../src'

	const value = ref(['500000', '500100', '500112'])
	const changeOnSelect = ref(false)

	function changeA(d: any) {
		console.log(d)
	}
</script>

<template>
	<div style="padding: 20px">
		<p style="margin-bottom: 15px">
			<Checkbox v-model="changeOnSelect">点击即选中</Checkbox>
		</p>
		<div style="margin-bottom: 15px">
			示例：
			<div style="width: 280px; display: inline-block">
				<ar-cascader v-model="value" :change-on-select="changeOnSelect" @on-change="changeA" />
			</div>
		</div>
		<div>组件值： {{ value }}</div>
	</div>
</template>
