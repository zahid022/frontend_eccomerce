<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { Form, Field, ErrorMessage, useForm  } from 'vee-validate';
import * as yup from 'yup';
import api from '@/services/api';

const showPassword = ref<boolean>(false)

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const toggleShow = () => {
    showPassword.value = !showPassword.value
}

const handleSubmit = async (values: any) => {
    const { email, password } = values
    let result = await api.login(email, password)

    localStorage.setItem("token", JSON.stringify(result.token))
    location.reload()
};

useForm({ validationSchema: schema });
</script>

<template>
    <div class="h-screen bg-gray-50 flex justify-center items-center">
        <div class="flex flex-col w-[400px] p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
            <div class="mb-8 text-center">
                <h1 class="my-3 text-4xl font-bold">Sign in</h1>
                <p class="text-sm text-gray-600">Sign in to access your account</p>
            </div>
            <Form @submit="handleSubmit" :validation-schema="schema">
                <div class="mb-6">
                    <div class="mb-4">
                        <label for="email" class="block text-md font-medium">Email address</label>
                        <Field type="email" name="email" placeholder="email@example.com"
                            class="w-full outline-none px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                        <ErrorMessage name="email" class="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label for="password" class="text-md font-medium block">Password</label>
                        <div class="relative">
                            <Field :type="showPassword ? 'text' : 'password'" name="password" placeholder="*****"
                                class="w-full outline-none px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                            <ErrorMessage name="password" class="text-red-500 text-sm" />
                            <button @click="toggleShow()" type="button"
                                class="right-3 absolute top-2/4 -translate-y-2/4">
                                <span>
                                    <EyeSlashIcon v-if="showPassword" class="w-4 h-4" />
                                    <EyeIcon v-else class="w-4 h-4" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <button type="submit"
                            class="w-full px-8 py-3 font-semibold duration-300 rounded-md hover:bg-blue-700 bg-blue-600 text-gray-50">Sign
                            in</button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>