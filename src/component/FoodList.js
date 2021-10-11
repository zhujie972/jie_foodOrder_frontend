import React, {useState, useEffect} from 'react';
import {Select, message, List, Avatar, Card, Tooltip, Button} from "antd";
import {getMenus, getRestaurants, addItemToCart} from "../utils";
import {PlusOutlined} from '@ant-design/icons';

const{Option} = Select;

function AddToCartButton({itemId}) {
    const [loading, setLoading] = useState(false);
    const AddToCart = () => {
        // add item to cart, 使用addItemToCart 函数
        // set loading to true; step1
        setLoading(true);
        //add menu to cart and inform server : step2
        addItemToCart(itemId)
            .then(() => message.success(`Successfully add item`))
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <Tooltip title = "Add to shopping cart">
            <Button
                loading={loading}
                type="primary"
                icon={<PlusOutlined />}
                onClick={AddToCart}>
            </Button>
        </Tooltip>
    )
}

function FoodList(props){
    // current selected restaurant
    const [curRest, setCurRest] = useState();
    //loading rest status
    const [loadingRest, setLoadingRest] = useState(false);
    // restaurant list
    const [restaurant, setRestaurant] = useState([]); // 查看一下restaurant fetch 返回的是什么， 这里是array
    // loading menu status
    const [loading, setLoading] = useState(false);
    // storage for menu
    const [foodData, setFoodData] = useState();

    // fetch restaurant list *********************************************************
    useEffect(() => {
        //step1: set loading restaurant = true
        setLoadingRest(true);
        //step2 : fetch restaurant list from the server
        getRestaurants()
            .then(response => {
                setRestaurant(response);
            })
            .catch( err => {
                message.error(err.message);
            })
            .finally( () => {
                setLoadingRest(false);
            })
    },[] );
    // fetch menu from selected restaurant *********************************************
    //curRest 变化的时候 触发，选择restaurant 会改变curRest
    useEffect( () => {
        // step1: set loading

        //step2 : fetch menu from server
        if(curRest) {
            setLoading(true);
            getMenus(curRest)
                .then(response => {
                    setFoodData(response);
                })
                .catch(err => {
                    message.error(err.message());
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [curRest])

    return <>
        <Select value={curRest}
                loading={loadingRest}
                style={{ width: 300 }}
                placeholder="Select a restaurant"
                onChange={() => {} }
                onSelect={value => setCurRest(value)}

        >
            {
                restaurant.map( item =>  <Option key = {item.id} value = {item.id} > {item.name}  </Option>) // 这里curRest 变成对应的restaurant id
            }
        </Select>
        {
            curRest && (
                <List
                    style={{marginTop: 20 }}
                    loading={ loading }
                    grid = {{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3,
                    }}
                    itemLayout="horizontal"
                    dataSource={foodData} // 接受数据源， 是array
                    renderItem={item => (
                        <List.Item>
                            <Card
                                title = { item.name }
                                extra={<AddToCartButton itemId={item.id} />}
                            >
                                <img src={ item.imageUrl }
                                     alt={ item.name }
                                     style={{height: 'auto', width: "100%",  display: "block" }}
                                />
                                Price: { item.price }
                            </Card>
                        </List.Item>
                    )}
                />
            )
        }
        </>
}

export default FoodList;