'use client';
import { Form, Input, Button } from '@heroui/react'
import { useState } from 'react'
import { registerUser } from '@/actions/register';


interface IProps {
    onClose: () => void;
}

export default function RegistrationForm({onClose}: IProps)  {
    const [formData, setFormData] = useState( {
        email: '',
        password: '',
        confirmPassword: ''
    })

    const validateEmail = (email: string) => {
        const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        const result = registerUser(formData);
        console.log(result);

        onClose();
    }



  return (
    <Form className='w-full' onSubmit={handleSubmit}>

        <Input aria-label='Email' isRequired name='email' placeholder='Введіть email' type='email'
        value={formData.email} classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus:outline:none'}}   
        onChange={(e) => setFormData({...formData, email: e.target.value})} 
        validate={(value) => {
            if (!value) return 'Введіть email';
            if (!validateEmail(value)) return 'Некоректний email';
        }}/>

        <Input  placeholder='Введіть пароль' type='password' name='password' isRequired
        value={formData.password} classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus:outline:none'}}   
        onChange={(e) => setFormData({...formData, password: e.target.value})} 
        validate={(value) => {
            if (!value) return 'Введіть пароль';
            if (value.length < 6) return 'Пароль має містити не менше 6 символів';
            return null;
        }}/>

        <Input  placeholder='Підтвердьте пароль' type='password' name='confirm password' isRequired
        value={formData.confirmPassword} classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus:outline:none'}}   
        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
        validate={(value) => {
            if (!value) return 'Поле підтвердження паролю є обов’язковим';
            if (value !== formData.password) return 'Паролі не збігаються';
            return null;
        }}/>

        <div className='flex gap-2'>
            <Button onPress={onClose}>
                Закрити
            </Button>

            <Button type='submit' color='primary'>
                Зареєструватися
            </Button>
        </div>
    </Form>
  ) 
}
