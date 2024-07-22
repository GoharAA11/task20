import { handleUpdate } from "@/app/lib/actions/course-actions"
import { getCourseById } from "@/app/lib/api"

interface IProps {
    params: { id: number }

}
export default function Page({ params }: IProps) {
    const cousre = getCourseById(params.id)


    return <>
        <p className="is-size-1">Edit Course No {params.id}</p>
        <div className="columns">
            <div className="column  is-two-fifths my-4">
                <form className="box my-5" action={handleUpdate} >
                    <input
                        type="hidden"
                        name="id"
                        defaultValue={params.id} />
                    <div className="field my-4">
                        <input
                            type="text"
                            className="input is-primary"
                            name="name"
                            placeholder="enter a name"
                            defaultValue={cousre.name}
                        />
                    </div>
                    <div className="field my-4">
                        <input
                            type="text"
                            className="input is-primary"
                            name="price"
                            placeholder="enter a price"
                            defaultValue={cousre.price}

                        />
                    </div>
                    <div className="field my-4">
                        <input
                            type="text"
                            className="input is-primary"
                            name="duration"
                            placeholder="enter a duration"
                            defaultValue={cousre.duration}
                        />
                    </div>
                    <div className="field my-4">

                    </div>
                    <div className="field my-4">
                        <button className="button is-danger">submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}