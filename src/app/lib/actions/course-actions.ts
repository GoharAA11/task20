"use server"

import { createWriteStream } from "fs"
import { CourseWithout, InputCourse, InputModule, addCourse, addModuleDb, UpdateCourse, getCourseByName } from "../api"
import { redirect } from "next/navigation"
import { ICourse } from "../api"



export const handleAdd = async (elm: unknown, data: FormData) => {


  if (!data.get("name") && !data.get("duration") && !data.get("price")) {
    return {
      message: "Please fill all the fields"
    }
  }

  const durationValid = +(data.get("duration") as string)
  if (!Number(durationValid) || !data.get("duration")) {
    return {
      message: "Fill in the duration field, it must be a number"
    }
  }

  const priceValid = +(data.get("price") as string)
  if (!Number(priceValid) || !data.get("price")) {
    return {
      message: "Fill in the price field, it must be a number"
    }
  }

  const uniqNameValid = data.get("name") as string
  if (getCourseByName(uniqNameValid)) {
    return {
      message: "Please choose another name for the course "
    }
  }

  const photo = data.get('cover') as File
  if (photo) {
    let extension = photo.type.split("/").at(-1)
    const filename = Date.now() + "." + extension

    const stream = createWriteStream("public/images/" + filename)

    const bufferedImage = await photo.arrayBuffer()

    stream.write(Buffer.from(bufferedImage))


    let course: InputCourse = {

      name: data.get('name') as string,
      price: +(data.get('price') as string),
      duration: +(data.get('duration') as string),
      cover: 'images/' + filename

    }

    addCourse(course)
    redirect("/")

  }
}
export const handleUpdate = async (data: FormData) => {
  
    let course: CourseWithout = {

      name: data.get("name") as string,
      price: +(data.get("price") as string),
      duration: +(data.get("duration") as string)

  }

    let id = +(data.get("id") as string)
    UpdateCourse(id, course)
    redirect("/courses")




}

export const addModule = async (data: FormData) => {
  let obj: InputModule = {
    name: data.get("name") as string,
    duration: +(data.get("duration") as string),
    courseId: +(data.get("courseId") as string)
  }

  let result = addModuleDb(obj)
  console.log(result)
  redirect("/courses")
}