import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserIcon, ChevronDownIcon , SearchIcon, AdjustmentsIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity'



const HomeScreen = () => {
    const navigation = useNavigation();
    const [featureCategories, setFeatureCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        sanityClient.fetch(
        `
        *[_type == "featured"] {
            ...,
            restuarants[]->{
                ...,
                dishes[]->
            }
        }
        `
        ).then((data) => {
            setFeatureCategories(data);
        })
    }, [])

    console.log(featureCategories);

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image className="h-7 w-7 bg-gray-300 p-4 rounded-full" 
          source={{
              uri: "https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0"
          }}
          />
          <View className="flex-1">
              <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
              <Text className="font-bold text-xl">Current Location
               {/* <ChevronDownIcon size={20} color="#00ccbb" />   */}
               </Text>
          </View>
      </View>

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
              <TextInput placeholder="Restuarant and Cuisine" keyboardType="default" />
          </View>
      </View>

        <ScrollView>
            <Categories />

             {featureCategories?.map(category => (
                <FeaturedRow key={category._id} id={category._id} title={category.name} description={category.short_description} />
             ))}

            {/* <FeaturedRow title="Tasty Discount" description="Paid placements from our partners" id="456" /> */}
            {/* <FeaturedRow title="Offers Near You" description="Paid placements from our partners" id="789" /> */}
        </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen