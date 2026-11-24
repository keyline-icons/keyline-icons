import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Avocado({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.0541 2.4952C13.2918 1.5504 15.7107 1.0344 18.185 1.0005C19.4673 0.983 20.7019 1.4846 21.6087 2.3914C22.5154 3.2981 23.0171 4.5329 22.9995 5.8152C22.9318 10.7635 20.9359 15.4904 17.4364 18.9898C16.3862 20.04 15.2166 20.9634 13.9515 21.7411C10.5996 23.8015 6.2718 23.2923 3.4897 20.5103C0.7077 17.7282 0.1985 13.4004 2.2589 10.0485C3.0366 8.7835 3.96 7.6139 5.0101 6.5637C6.7598 4.814 8.8165 3.4401 11.0541 2.4952Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M5.5001 14.4999C5.5001 13.4778 5.8908 12.4523 6.6717 11.6715C8.2338 10.1094 10.7664 10.1094 12.3285 11.6715C13.8906 13.2336 13.8906 15.7662 12.3285 17.3283C10.7664 18.8904 8.2338 18.8904 6.6717 17.3283C5.8908 16.5475 5.5001 15.522 5.5001 14.4999Z" fill="currentColor"/>
    </svg>
  )
}
