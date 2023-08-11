import { FormInput } from "../FormInput";

export function ExportInput() {
    return (
        <>
            <FormInput legend="Exporter"  className="formInput-container">
                <p> BACK : à revoir pour les export comment ça se gere </p>
                <label for="avatar">Choisir un répertoire d'expedition :</label>
                <input type="file" accept="csv" />
            </FormInput>
        </>
    )
}