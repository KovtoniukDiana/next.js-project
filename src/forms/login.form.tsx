'use client';
import { Form, Input, Button } from '@heroui/react'
import { useState } from 'react'
import { SignInWithCredentials } from "@/actions/sign.in";



interface IProps {
    onClose: () => void;
}

export default function LoginForm({onClose}: IProps)  {
    const [formData, setFormData] = useState( {
        email: '',
        password: '',
        confirmPassword: ''
    })


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        const result = await SignInWithCredentials(formData.email, formData.password);
        console.log(result)
        onClose();
    }



  return (
    <Form className='w-full' onSubmit={handleSubmit}>

        <Input aria-label='Email' isRequired name='email' placeholder='Введіть email' type='email'
        value={formData.email} classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus:outline:none'}}   
        onChange={(e) => setFormData({...formData, email: e.target.value})} 
        validate={(value) => {
            if (!value) return 'Ввеліть email';
        }}/>

        <Input  placeholder='Введіть пароль' type='password' name='password' isRequired
        value={formData.password} classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus:outline:none'}}   
        onChange={(e) => setFormData({...formData, password: e.target.value})} 
        validate={(value) => {
            if (!value) return 'Введіть пароль';
            return null;
        }}/>


        <div className='flex gap-2'>
            <Button onPress={onClose}>
                Закрити
            </Button>

            <Button type='submit' color='primary'>
                Увійти
            </Button>
        </div>
    </Form>
  ) 
}
