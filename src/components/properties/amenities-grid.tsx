import {
  Car, Waves, Dumbbell, Shield, Zap, ArrowUpDown,
  TreePine, Building2, Camera, Gamepad2, Activity,
  Droplets, Sun, Wifi, PawPrint, Trophy, Music2,
  Flame, Coffee, Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  'parking':            Car,
  'covered parking':    Car,
  'swimming pool':      Waves,
  'pool':               Waves,
  'gymnasium':          Dumbbell,
  'gym':                Dumbbell,
  'security':           Shield,
  '24/7 security':      Shield,
  'power backup':       Zap,
  'lift':               ArrowUpDown,
  'elevator':           ArrowUpDown,
  'garden':             TreePine,
  'landscaped gardens': TreePine,
  'clubhouse':          Building2,
  'club house':         Building2,
  'cctv':               Camera,
  'cctv surveillance':  Camera,
  'kids play area':     Gamepad2,
  'jogging track':      Activity,
  'rainwater harvesting': Droplets,
  'solar power':        Sun,
  'wi-fi':              Wifi,
  'wifi':               Wifi,
  'pet friendly':       PawPrint,
  'indoor games':       Trophy,
  'amphitheater':       Music2,
  'yoga':               Flame,
  'meditation':         Flame,
  'restaurant':         Coffee,
  'café':               Coffee,
  'concierge':          Sparkles,
}

function getIcon(amenity: string): LucideIcon {
  const key = amenity.toLowerCase()
  return iconMap[key] ?? Sparkles
}

interface AmenitiesGridProps {
  amenities: string[]
}

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  if (amenities.length === 0) return null

  return (
    <div>
      <h2 className="font-serif text-2xl text-[#F5F0E8] mb-4">Amenities</h2>
      <ul
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        role="list"
        aria-label="Property amenities"
      >
        {amenities.map(amenity => {
          const Icon = getIcon(amenity)
          return (
            <li
              key={amenity}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1A1F2E] border border-[#2E3447]"
            >
              <Icon size={16} className="shrink-0 text-[#C9A96E]" aria-hidden="true" />
              <span className="font-sans text-sm text-[#A89F94] leading-snug">{amenity}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
