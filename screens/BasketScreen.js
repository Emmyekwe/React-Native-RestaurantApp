import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestuarant } from '../features/restuarantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useMemo } from 'react';
import { useState } from 'react';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';


const BasketScreen = () => {
    const navigation = useNavigation();
    const restuarant = useSelector(selectRestuarant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const [ groupedItemsInBasket, setGroupedItemsInBasket ] = useState([])
    const dispatch = useDispatch();

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);

            return results;
        }, {});

        setGroupedItemsInBasket(groupedItems)
    }, [items])

  return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-gray-100">
            <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xs">
                <View>
                    <Text className="text-lg font-bold text-center">Basket</Text>
                    <Text className="text-center text-gray-400"> {restuarant.title} </Text>
                </View>
                <TouchableOpacity onPress={navigation.goBack} className="rounded-full bg-gray-100 absolute top-3 right-5">
                    <Text className="text-[#00ccbb]">Back</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                <Image
                    source={{uri: "data:image/jpeg;base64,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"}}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />
                <Text className="flex-1">
                    Deliver in 50 minutes
                </Text>
                <TouchableOpacity>
                    <Text className="text-[#00ccbb]">Change</Text>
                </TouchableOpacity>
            </View>
            <ScrollView className="divide-y divide-gray-200">
                {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                    <View key={key} className="flex-row items-center space-x-3 px-5 py-2 bg-white">
                        <Text className="text-[#00ccbb]">{items.length} x</Text>
                        <Image
                        source={{uri: urlFor(items[0]?.image).url()}}
                        className="h-12 w-12 rounded-full"
                        />
                        <Text className="flex-1">{items[0]?.name}</Text>

                        <Text className="text-gray-600">
                            <Currency quantity={items[0]?.price} currency="GBP" />
                        </Text>
                        <TouchableOpacity>
                            <Text className="text-[#00ccbb] text-xs" onPress={() => dispatch(removeFromBasket({ id: key })) }>
                                    Remove
                                </Text> 
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <View className="p-5 bg-white mt-5 space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Subtotal</Text>
                    <Text className="text-gray-400">
                        <Currency quantity={basketTotal} currency="GBP" />
                    </Text>
                </View>

                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Delivery Fee</Text>
                    <Text className="text-gray-400">
                        <Currency quantity={5.99} currency="GBP" />
                    </Text>
                </View>

                <View className="flex-row justify-between">
                    <Text >Order Total</Text>
                    <Text className="font-extrabold">
                        <Currency quantity={basketTotal + 5.99} currency="GBP" />
                    </Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} className="rounded-lg bg-[#00ccbb] p-4">
                    <Text className="text-center text-white text-lg font-bold">Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default BasketScreen