
import { useGetClietnsQuery } from "../../Redux/Api/firbase-api-main"
import { Spin } from "antd"
import { CardClient } from "../cardClinet/cardClient"
import { GridContainer } from "../gridContainer/gridContainer"


export const RenderClient = ({ cm }) => {
    const { data: clients = [], isLoading, error, isFetching } = useGetClietnsQuery(cm)
    console.log(clients)
    return (
        <GridContainer>
            {isFetching && <Spin />}
            {error && <div>Something went wrong</div>}
            {isFetching || clients.map((item, index) => (
                <CardClient cl={item} key={index} />
            ))}
        </GridContainer>
    )
}
