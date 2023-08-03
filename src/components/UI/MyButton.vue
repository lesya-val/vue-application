<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'MyButton',
}
</script>

<style>
	.btn {
		padding: 10px;
		border: 1px solid teal;
		background: transparent;
		color: teal;
	}
</style>