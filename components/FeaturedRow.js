import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import RestuarantCard from './RestuarantCard'
import sanityClient from '../sanity'

const FeaturedRow = ({ title, description, id }) => {
  const [restuarants, setRestuarant] = useState([])

      useEffect(() => {
        sanityClient
        .fetch(
        `
        *[_type == "featured" && _id == $id] {
            ...,
            restuarants[]->{
                ...,
                dishes[]->,
                type-> {
                  name
                }
            },
        }[0]
        `,
        { id }
        )
        .then((data) => {
          setRestuarant(data?.restuarants);
        })
    }, [id])

    console.log(restuarants)

  return (
    <View>
        <View className="mt-4 flex-row items-center justify-between px-4"> 
            <Text className="font-bold text-xl">{title}</Text>
        </View>

        <Text className="text-xs text-gray-500 px-4">{description}</Text>

        <ScrollView
            horizontal
            contentContainerStyle={{
                paddingHorizontal: 15, 
            }}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
        >

      {restuarants?.map(restuarant => (
         <RestuarantCard   
          key={restuarant._id} id={restuarant._id} imgUrl={restuarant.image} address={restuarant.address} title={restuarant.name} rating={restuarant.rating} genre={restuarant.type?.name} short_description={restuarant.short_description}  dishes={restuarant.dishes} long={restuarant.long} lat={restuarant.lat}
       />
      ))}
    </ScrollView>
    </View>
  )
}

export default FeaturedRow