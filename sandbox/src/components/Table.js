import "./table.css"



export default function Table(props){

    return(
        <table id="customers">
            <thead>
                <tr>
                    <th>Book</th>
                    <th>Chapter</th>
                    <th>Verse</th>
                    <th>Proximity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>+{ props.book }</td>
                    <td>+{ props.chap }</td>
                    <td>+{ props.verse }</td>
                    <td>+{ props.prox }</td>
                    <td>+{ props.prox + props.chap + props.verse + props.book }</td>
                </tr>
            </tbody>

        </table>
    )
}