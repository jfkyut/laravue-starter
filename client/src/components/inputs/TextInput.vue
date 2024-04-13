<script setup>

defineProps({ 
  type: {
    type: String,
    default: 'text'
  },  
  name: String, 
  placeholder: String,
  required: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: ''
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  modelValue: String || Number
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (e) => {
  emit('update:modelValue', e.target.value);
};

</script>

<template>
  <input 
    :readonly="readOnly"
    :type="type" 
    :id="name"
    :name="name" 
    :class="class"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-4 focus:outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
    :placeholder="placeholder" 
    :required="required"
    @input="handleChange"
    :value="modelValue" />
</template>