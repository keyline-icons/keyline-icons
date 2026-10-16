import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MapPinOff({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17.4296 17.4296L12.75 22.6667C12.5556 22.8788 12.2846 23 12 23C11.7154 23 11.4444 22.8788 11.2546 22.6667L5.2918 16C3.8159 14.35 3 12.2138 3 10C3 8.03 3.6361 6.1987 4.7146 4.7146L17.4296 17.4296ZM6.9035 2.6608C8.3691 1.6207 10.135 1 12 1C16.8325 1 21 5.1675 21 10C21 11.7901 20.4072 13.6433 19.382 15.1393ZM12 7.7573C12 7.7573 12 7.7573 12 7.7573C13.2386 7.7573 14.2427 8.7614 14.2427 10Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
