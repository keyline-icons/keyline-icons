import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SwatchBook({ size = 24, ...props }: IconProps) {
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
      <path d="M2 17L2 3C2 2.4477 2.4477 2 3 2L11 2C11.5523 2 12 2.4477 12 3L12 17C12 19.7614 9.7614 22 7 22C4.2386 22 2 19.7614 2 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 17L3 3L11 3L11 17C11 19.2091 9.2091 21 7 21C4.7909 21 3 19.2091 3 17ZM10.0642 19.5712L19.0632 8.8465L12.9348 3.7042L11 6.0101M7.6946 20.9392L21 18.5931L19.6109 10.7147L17.1284 11.1524"/>
      <path d="M6 17C6 17.5523 6.4477 18 7 18C7.5523 18 8 17.5523 8 17C8 16.4477 7.5523 16 7 16C6.4477 16 6 16.4477 6 17Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
