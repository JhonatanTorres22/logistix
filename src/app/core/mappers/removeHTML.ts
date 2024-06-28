export class RemoveHTML {
    static removeHTML = ( values: string ): string => {
        const expRegHTML: RegExp =  /(<([^>]+)>)/ig
        const newData = values.replace( expRegHTML, '')
        // console.log( newData );
        return newData
        
    }
}