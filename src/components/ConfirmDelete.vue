<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-lg text-center">
      <h2 class="text-lg font-semibold mb-2">Are you sure?</h2>
      <p class="text-gray-600 mb-5">Do you really want to delete this item?</p>

      <div class="flex justify-center gap-3">
        <button @click="onCancel" class="primary">
          Cancel
        </button>
        <button @click="onConfirm" class="primary">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default{
    name:"ConfirmDelete",
    props: {
        show: {
            type: Boolean,
            default: false,
        }
    },
    emits: ["confirm", "cancel"],
    methods: {
        onConfirm() {
        this.$emit("confirm");
        },
        onCancel() {
        this.$emit("cancel");
        },
    },
}
</script>