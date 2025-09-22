import IngredientForm from "@/forms/ingredient.form"
import IngredientsTable from "@/components/UI/tables/ingredients"

export default function IngredientsPage() {
  return (
    <div>
      <IngredientForm />
      <IngredientsTable />
    </div>
  )
}
