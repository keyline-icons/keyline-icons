import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cupcake({ size = 24, ...props }: IconProps) {
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
      <path d="M13 15L5 15L3 15C2.4477 15 2 14.5523 2 14L2 13C2 10.2386 4.2386 8 7 8L17 8C19.7614 8 22 10.2386 22 13L22 14C22 14.5523 21.5523 15 21 15ZM10.3828 17L13.6172 17L13.1327 20.876L15.1173 21.124L15.6328 17L19.2807 17L17.97 22.2425C17.8587 22.6877 17.4588 23 16.9999 23L7.0001 23C6.5412 23 6.1413 22.6877 6.03 22.2425L4.7193 17L8.3672 17L8.8827 21.124L10.8673 20.876Z" fill="currentColor" stroke="none"/>
      <path d="M12 9L12 5"/>
      <path d="M13 2C13 2.5523 12.5523 3 12 3C11.4477 3 11 2.5523 11 2C11 1.4477 11.4477 1 12 1C12.5523 1 13 1.4477 13 2Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
