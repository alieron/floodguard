import { useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, ScrollView, NativeScrollEvent, NativeSyntheticEvent, Button, Pressable } from 'react-native';
import { getDocumentByID } from '../utils/appwrite';

const { width } = Dimensions.get('window');

interface DetailsProps {
  description: string,
  reportedAt: number,
  imageUrls: string[]
}

const formatDate = (ms: number) => {
  const date = new Date(ms);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ImageSlider = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(newIndex);
  };

  return (
    <View className="w-full items-center">
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        className="w-full"
      >
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            className="w-full"
            resizeMode="cover"
            style={{ width, height: width }} // required for pagination width
          />
        ))}
      </ScrollView>
      {images.length > 1 && (
        <View className="flex-row justify-center mt-2">
          {images.map((_, i) => (
            <View
              key={i}
              className={`w-2 h-2 mx-1 rounded-full ${i === activeIndex ? "bg-blue-600" : "bg-gray-400"
                }`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default function DetailsScreen({ navigation, route }: any) {
  const [details, setDetails] = useState<DetailsProps>();
  const { id, type }: { id: string, type: string } = route.params;

  const getDetails = async () => {
    const toDetailsProps = (data: any) => {
      return {
        description: data.description,
        reportedAt: data.reportedAt,
        imageUrls: data.imageUrls
      } as DetailsProps;
    };

    setDetails(toDetailsProps(await getDocumentByID(type + "s" as any, id)));
  };

  useEffect(() => {
    navigation.setOptions({
      title: type.charAt(0).toUpperCase() + type.slice(1)
    })
    getDetails();
  }, [navigation, type, id]);

  useEffect(
    () => navigation.addListener('focus', () => getDetails()),
    [navigation, type, id]
  );

  useEffect(
    () => navigation.addListener('blur', () => setDetails(undefined)),
    [navigation, type, id]
  );


  return (
    <View className="flex-1 bg-white mb-20">
      {details !== undefined && (
        <>
          <ImageSlider images={details.imageUrls} />

          <View className="px-5 mt-5">
            <Text className="text-lg font-semibold mb-2">Description</Text>
            <Text className="text-base text-gray-700 mb-4">{details.description}</Text>
            <Text className="text-sm text-gray-500">Posted on {formatDate(details.reportedAt)}</Text>
            {type === "report" && (
              <Pressable className="items-center mt-4" onPress={() => navigation.navigate('Home', { focusedReportId: id })}>
                <Text className="text-blue-500">View on Map</Text>
              </Pressable>
            )}
          </View>
        </>
      )}
    </View>
  );
}
