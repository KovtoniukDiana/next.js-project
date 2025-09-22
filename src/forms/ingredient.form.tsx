'use client'
import { useState, useTransition } from "react"
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem, Button } from "@heroui/react";
import { CATEGOTY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useIngredientStore } from "@/store/ingredients.store";


export default function IngredientForm() {

    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        unit: "",
        prisePerUnit: null as number | null,
        description: ""
    })

    const { addIngredients } = useIngredientStore();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        console.log(formData);

        startTransition(async() => {
            await addIngredients(formData);

            const storeError = useIngredientStore.getState().error;

            if(storeError) {
                setError(storeError);
                alert('Помилка при додаванні нового інгредієнту');
            } else {
                setError(null);
                setFormData(
                    {
                        name: "",
                        category: "",
                        unit: "",
                        prisePerUnit: null as number | null,
                        description: ""
                    }
                )
                alert('Ви успішно додали новий інгредієнт');
            }
        })
    }

  return (
    <Form className="w-full" action={handleSubmit}>

        <Input isRequired name="name" placeholder="Введіть назву інгредієнта" type="text" 
        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}  
        classNames={{ inputWrapper: 'bg-default-100' , input: "text-sm focus:outline-none"}} 
        validate={(value) => {if(!value) return "Назва обов'язкова"; return  null}} />

        <div className="flex gap-2 w-full" >
            <div className="w-1/3">
                <Select isRequired name="category" placeholder="Категорія" selectedKeys={formData.category ? [formData.category] : []} 
                classNames={{trigger: "bg-default-100 w-full", innerWrapper: "etxt-sm", value: "truncate", selectorIcon: "text-black" }} 
                onChange={(e) => {setFormData({...formData, category: e.target.value})}}>

                    { CATEGOTY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} className="text-black" >
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <div className="w-1/3">
                <Select isRequired name="unit" placeholder="Одиниці вимірювання" selectedKeys={formData.unit ? [formData.unit] : []} 
                classNames={{trigger: "bg-default-100 w-full", innerWrapper: "etxt-sm", value: "truncate", selectorIcon: "text-black" }} 
                onChange={(e) => {setFormData({...formData, unit: e.target.value})}}>

                    { UNIT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} className="text-black" >
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="w-1/3">
                <Input isRequired name="pricePerUnit" placeholder="Ціна" type="number" 
                value={formData.prisePerUnit !== null ? formData.prisePerUnit.toString() : ""}
                classNames={{inputWrapper: "bg-default-100", input: "text-sm focus: outline-none"}}  
                onChange={(e) => {
                    const value = e.target.value ? parseFloat(e.target.value) : null;
                    setFormData({...formData, prisePerUnit: value})
                }}
                endContent={
                    <span className="absolute right-3 top-1/4">₴</span>
                }
                validate={(value) => {
                    if(!value) return "Ціна обов'язкова";
                    const num = parseFloat(value)
                    if(isNaN(num) || num < 0)
                        return "Неправильне значення для ціни";
                return null;
                }}
                />
            </div>

            <Input name="description" placeholder="Введіть опис(необов'язково)" type="text" value={formData.description}
            classNames={{inputWrapper: "bg-default-100", input: "text-sm focus: outline-none"}} 
            onChange={(e) => {
                setFormData({...formData, description: e.target.value})
            }}/>
        </div>

        <div className="flex w-full items-center justify-end">
            <Button color="primary" type="submit" isLoading={isPending}>
                Додати інгредієнт
            </Button>
        </div>
            
    </Form>
  )
}
