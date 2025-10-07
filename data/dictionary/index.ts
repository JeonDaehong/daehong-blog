import { bigDataTechnologies } from "./big-data"
import { csTechnologies } from "./cs"
import { dbTechnologies } from "./db"
import { containerTechnologies } from "./container"
import { infrastructureTechnologies } from "./infrastructure"
import { categories } from "./categories"

export const itTechnologies = [
  ...bigDataTechnologies,
  ...csTechnologies,
  ...dbTechnologies,
  ...containerTechnologies,
  ...infrastructureTechnologies,
]

export { categories }
