import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setHasOnboarded } from '../lib/onboarding';

const onboarding1 = require('../assets/onboarding/onboarding-1.webp');
const onboarding2 = require('../assets/onboarding/onboarding-2.webp');
const onboarding3 = require('../assets/onboarding/onboarding-3.webp');

type Slide = {
  key: string;
  title: string;
  description: string;
  image: any;
};

const SLIDES: Slide[] = [
  {
    key: 'learn',
    title: 'Learn Together',
    description:
      'Access the university question bank, academic resources, and study materials all in one place to excel in your studies.',
    image: onboarding1,
  },
  {
    key: 'connect',
    title: 'Connect with Your Campus',
    description:
      'Join student communities, find friends, and stay connected with everything happening at University Park.',
    image: onboarding2,
  },
  {
    key: 'everything',
    title: 'Everything Campus, In One Place',
    description:
      'Stay updated with latest notices, discover campus events, join clubs, and shop for official merchandise effortlessly.',
    image: onboarding3,
  },
];

export default function Onboarding() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [index, setIndex] = useState(0);

  const isLast = index === SLIDES.length - 1;

  const finish = async () => {
    await setHasOnboarded();
    router.replace('/(auth)/sign-in');
  };

  const handleNext = () => {
    if (isLast) {
      finish();
      return;
    }

    const nextIndex = index + 1;

    scrollRef.current?.scrollTo({
      x: width * nextIndex,
      animated: true,
    });

    setIndex(nextIndex);
  };

  const goToSlide = (slideIndex: number) => {
    scrollRef.current?.scrollTo({
      x: width * slideIndex,
      animated: true,
    });

    setIndex(slideIndex);
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);

    if (next !== index) {
      setIndex(next);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      {/* Header */}
      <View className="h-12 flex-row items-center justify-end px-6">
        <Pressable hitSlop={12} onPress={finish}>
          <Text className="text-base font-medium text-gray-400">Skip</Text>
        </Pressable>
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}>
        {SLIDES.map((slide) => (
          <View key={slide.key} style={{ width }} className="px-6">
            <View className="pt-1">
              {/* Image */}
              <View className="w-full overflow-hidden rounded-3xl">
                <Image
                  source={slide.image}
                  className="w-full"
                  style={{
                    height: 400,
                  }}
                  contentFit="cover"
                />
              </View>

              {/* Title */}
              <Text className="text-primary mt-6 text-center text-3xl font-bold leading-8">
                {slide.title}
              </Text>

              {/* Description */}
              <Text className="mt-4 px-2 text-center text-base leading-6 text-gray-500">
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View className="px-6 pb-4 pt-3">
        {/* Pagination */}
        <View className="mb-6 flex-row items-center justify-center">
          {SLIDES.map((slide, i) => (
            <Pressable key={slide.key} onPress={() => goToSlide(i)} hitSlop={8} className="mx-1">
              <View
                className={`h-2 rounded-full ${i === index ? 'bg-primary w-6' : 'w-2 bg-gray-300'}`}
              />
            </Pressable>
          ))}
        </View>

        {/* Action */}
        <Pressable
          onPress={handleNext}
          className="bg-primary active:bg-primary-dark h-14 items-center justify-center rounded-2xl">
          <Text className="text-base font-semibold text-white">
            {isLast ? 'Get Started' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
