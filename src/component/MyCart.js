import React, {useEffect, useState} from 'react';
import {Button, Drawer, Typography, List, message} from "antd";
import {checkout, getCart} from "../utils";

const {Text} = Typography

function MyCart(props) {
    //display/hide drawer
    const [cartVisible, setCartVisible] = useState(false);
    //set loading
    const [loading, setLoading] = useState(false);
    // need store card data
    const [cartData, setCartData] = useState();
    // 点击checking 的时候 loading
    const [checking, setChecking] = useState(false);

    const onCloseDrawer = () => {
        setCartVisible(false);
    };

    const onOpenDrawer = () => {
        setCartVisible(true);
    };

    const onCheckOut = () => {
        setChecking(true);
        checkout()
            .then(() => {
                message.success("Successfully checkout");
                setCartVisible(false);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });
    };

    // set when to show the List in drawer  -> when cartVisible is changed
    // useEffect( () => {
    //     if(cartVisible) {
    //         setLoading(true);
    //         getCart()
    //             .then(response => setCartData(response))
    //             .catch( (err) => {
    //                 message.error(err.message);
    //             })
    //             .finally( () => {
    //                 setLoading(false);
    //             })
    //     }
    // }, [cartVisible])
    useEffect(() => {
        if (!cartVisible) {
            return;
        }

        setLoading(true);
        getCart()
            .then((data) => {
                setCartData(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [cartVisible]);


    return (
        <>
            <Button type="primary" shape="round" onClick={onOpenDrawer}>
                Cart
            </Button>
            <Drawer
                title="My Shopping Cart"
                placement = "right"
                onClose={onCloseDrawer}
                visible={cartVisible}
                width={520}
                footer={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text strong={true}>
                            {`Total price: 1`}
                        </Text>
                        <Button
                            onClick={onCloseDrawer} style={{ marginRight: 8 }}
                        >
                                Cancel
                        </Button>

                        <Button
                                type="primary"
                                onClick = {onCheckOut}
                        >
                                Checkout
                        </Button>
                    </div>
                }
            >

                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={cartData?.orderItemList}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.menuItem.name}
                                description={`$${item.price}`}
                            />
                        </List.Item>
                    )}
                />

            </Drawer>
        </>
    );
}

export default MyCart;