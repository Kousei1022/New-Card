import { useRef, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const PROFILE_POOL = [
  { name: 'Mika Reyes', role: 'Multimedia Arts Student', location: 'Cebu City', about: 'Finding new ways to tell stories through design.', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=300&q=85' },
  { name: 'Luis Navarro', role: 'Junior Web Developer', location: 'Davao City', about: 'Learning something new with every project.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=300&q=85' },
  { name: 'Amara Dizon', role: 'Community Volunteer', location: 'Baguio City', about: 'Making time for good people and good ideas.', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&h=300&q=85' },
  { name: 'Enzo Garcia', role: 'Architecture Student', location: 'Iloilo City', about: 'Sketching places for a better everyday life.', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&h=300&q=85' },
  { name: 'Taylor Kim', role: 'Photographer', location: 'Bacolod City', about: 'Usually looking for the best light.', photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&h=300&q=85' },
  { name: 'Noah Rivera', role: 'Music Producer', location: 'Cagayan de Oro', about: 'Collecting sounds and late-night ideas.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=300&q=85' },
];

function AddProfileButton({ onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Meet someone new"
      onPress={onPress}
      style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaPressed]}
    >
      <Text style={styles.ctaText}>Meet someone new</Text>
      <View style={styles.ctaArrow}>
        <Text style={styles.ctaArrowText}>↗</Text>
      </View>
    </Pressable>
  );
}

function ProfileCard({ profile, width }) {
  const initials = profile.name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View style={[styles.profileCard, { width }]}>
      <View style={styles.offsetShadow} />
      <View style={styles.cardSurface}>
        <View style={styles.cardTop}>
          <Text style={styles.cardLabel}>PERSONAL</Text>
          <Text style={styles.cardNumber}>01 / 01</Text>
        </View>
        <View style={styles.portraitFrame}>
          <Image
            accessibilityLabel={`Portrait of ${profile.name}`}
            source={{ uri: profile.photo }}
            style={styles.portrait}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.monogram} accessibilityElementsHidden>
          {initials}
        </Text>
        <View style={styles.cardBottom}>
          <Text style={styles.cardCaption}>A LITTLE ABOUT ME</Text>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileDetail}>{profile.role}</Text>
          <Text style={styles.profileDetail}>{profile.location}</Text>
          <Text style={styles.profileAbout} numberOfLines={2}>{profile.about}</Text>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const { width: screenWidth } = useWindowDimensions();
  const isWide = screenWidth >= 760;
  const cardWidth = isWide ? 250 : Math.min(screenWidth - 44, 310);
  const [profiles, setProfiles] = useState([]);
  const profileDeck = useRef([]);
  const previousProfile = useRef(null);

  function addRandomProfile() {
    if (profileDeck.current.length === 0) {
      profileDeck.current = [...PROFILE_POOL];
      for (let index = profileDeck.current.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [profileDeck.current[index], profileDeck.current[swapIndex]] = [
          profileDeck.current[swapIndex],
          profileDeck.current[index],
        ];
      }
      const lastProfile = profileDeck.current.length - 1;
      if (profileDeck.current.length > 1 && profileDeck.current[lastProfile].name === previousProfile.current) {
        [profileDeck.current[0], profileDeck.current[lastProfile]] = [
          profileDeck.current[lastProfile],
          profileDeck.current[0],
        ];
      }
    }

    const profile = profileDeck.current.pop();
    previousProfile.current = profile.name;
    setProfiles((currentProfiles) => [
      ...currentProfiles,
      { ...profile, id: `${Date.now()}-${Math.random()}` },
    ]);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.page, screenWidth < 480 && styles.pageSmall]}>
          <View style={styles.header}>
            <View style={styles.brand}>
              <View style={styles.brandMark}><Text style={styles.brandMarkText}>PC</Text></View>
              <Text style={styles.brandName}>PROFILE CARDS</Text>
            </View>
            <Text style={styles.headerNote}>PERSONAL PROFILE</Text>
          </View>

          <View style={[styles.hero, isWide && styles.heroWide]}>
            <View style={[styles.heroCopy, isWide && styles.heroCopyWide]}>
              <View style={styles.eyebrowRow}>
                <Text style={styles.eyebrowMark}>◆</Text>
                <Text style={styles.eyebrow}>A LITTLE INTRODUCTION</Text>
              </View>
              <Text style={[styles.headline, !isWide && styles.headlineSmall]}>
                Hello,{ '\n' }let's <Text style={styles.headlineAccent}>meet.</Text>
              </Text>
              <Text style={styles.intro}>Discover a new profile with every click.</Text>
              <AddProfileButton onPress={addRandomProfile} />
            </View>

            <View style={[styles.cardStage, isWide && styles.cardStageWide]}>
              {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} width={cardWidth} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fbfaf6' },
  scrollContent: { flexGrow: 1 },
  page: { width: '100%', maxWidth: 1200, minHeight: '100%', alignSelf: 'center', paddingHorizontal: 54 },
  pageSmall: { paddingHorizontal: 22 },
  header: { height: 82, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#e8e6df' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  brandMark: { width: 31, height: 31, alignItems: 'center', justifyContent: 'center', backgroundColor: '#202b25' },
  brandMarkText: { color: '#ffffff', fontSize: 10, fontWeight: '700' },
  brandName: { color: '#202b25', fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  headerNote: { color: '#777b73', fontSize: 9, fontWeight: '700', letterSpacing: 1.1 },
  hero: { flexGrow: 1, justifyContent: 'center', gap: 48, paddingTop: 56, paddingBottom: 64 },
  heroWide: { flexDirection: 'row', alignItems: 'center', gap: 54, paddingTop: 42, paddingBottom: 68 },
  heroCopy: { width: '100%', maxWidth: 520 },
  heroCopyWide: { width: '52%' },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 23 },
  eyebrowMark: { color: '#d66750', fontSize: 12 },
  eyebrow: { color: '#555c54', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  headline: { color: '#202b25', fontSize: 68, lineHeight: 70, fontWeight: '700' },
  headlineSmall: { fontSize: 54, lineHeight: 57 },
  headlineAccent: { color: '#285743', fontFamily: 'Georgia', fontSize: 72, fontStyle: 'italic', fontWeight: '400' },
  intro: { maxWidth: 360, marginTop: 24, marginBottom: 27, color: '#72786f', fontSize: 13, lineHeight: 23 },
  ctaButton: { minHeight: 45, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 14, paddingLeft: 16, paddingRight: 10, backgroundColor: '#174b3b' },
  ctaPressed: { opacity: 0.82, transform: [{ translateY: 1 }] },
  ctaText: { color: '#ffffff', fontSize: 11, fontWeight: '700' },
  ctaArrow: { width: 23, height: 23, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: '#d5e839' },
  ctaArrowText: { color: '#202b25', fontSize: 15, lineHeight: 18 },
  cardStage: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 20 },
  cardStageWide: { width: '48%' },
  profileCard: { aspectRatio: 0.77, position: 'relative', marginRight: 8, marginBottom: 9 },
  offsetShadow: { ...StyleSheet.absoluteFillObject, left: 8, top: 9, backgroundColor: '#d5e839' },
  cardSurface: { ...StyleSheet.absoluteFillObject, overflow: 'hidden', padding: 27, backgroundColor: '#d9634b' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  cardLabel: { color: '#fff9e9', fontSize: 9, fontWeight: '700', letterSpacing: 0.7 },
  cardNumber: { color: '#fff9e9', fontSize: 9, fontWeight: '700', letterSpacing: 0.7 },
  portraitFrame: { position: 'absolute', top: 47, right: 27, width: 64, height: 80, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255, 249, 233, 0.7)' },
  portrait: { width: '100%', height: '100%' },
  monogram: { position: 'absolute', top: '50%', left: 0, right: 0, color: '#e6ed38', fontSize: 58, fontWeight: '700', textAlign: 'center', transform: [{ translateY: -29 }] },
  cardBottom: { position: 'absolute', right: 27, bottom: 25, left: 27 },
  cardCaption: { color: '#fff9e9', fontSize: 8, fontWeight: '700', letterSpacing: 0.8 },
  profileName: { marginTop: 8, color: '#fff9e9', fontSize: 16, fontWeight: '700' },
  profileDetail: { marginTop: 5, color: 'rgba(255, 249, 233, 0.82)', fontSize: 10, lineHeight: 15 },
  profileAbout: { marginTop: 5, color: 'rgba(255, 249, 233, 0.82)', fontSize: 10, lineHeight: 15 },
});