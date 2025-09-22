'use client'
import { useIngredientStore } from "@/store/ingredients.store"
import { useAuthStore } from "@/store/auth.store"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button } from '@heroui/react'
import { CATEGOTY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";


export default function IngredientsTable() {

    const { ingredients, removedIngredients, isLoading } = useIngredientStore();
    const { isAuth } = useAuthStore();

    const handleDelete = async (id: string) => {
        await removedIngredients(id);
    }

    const getCategotyLabel = (value: string) => {
        const option = CATEGOTY_OPTIONS.find((opt) => opt.value === value);
        return option ? option.label : value
    }

    const getUnitLabel = (value: string) => {
        const option = UNIT_OPTIONS.find((opt) => opt.value === value);
        return option ? option.label : value
    }


    if(!isAuth) {
        return <p>Пройдіть автентифікацію щоб отримати доступ до даних</p>
    }

  return !isLoading && isAuth ? (
    <Table aria-label="Список інгредієнтів" classNames={{wrapper: "mt-4", table: "w-full", th: "text-black", td: "text-black"}} >

        <TableHeader>
            <TableColumn>Назва</TableColumn>
            <TableColumn>Категорія</TableColumn>
            <TableColumn>Одиниця вимірювання</TableColumn>
            <TableColumn>Ціна за одиницю</TableColumn>
            <TableColumn>Опис</TableColumn>
            <TableColumn>Дії</TableColumn>
        </TableHeader>

        <TableBody>
            { ingredients.map((el) => (
                <TableRow key={el.id}>
                    <TableCell>{el.name}</TableCell>
                    <TableCell>{getCategotyLabel(el.category)}</TableCell>
                    <TableCell>{getUnitLabel(el.unit)}</TableCell>
                    <TableCell> {el.pricePerUnit !== null ? `${el.pricePerUnit} ₴` : "-"} </TableCell>
                    <TableCell>{el.description || '-'}</TableCell>
                    <TableCell>
                        <Button color="danger" size="sm" onPress={() => handleDelete(el.id)}> Видалити </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>) : (<p className="mt-4">Завантаження...</p>
  )
}
