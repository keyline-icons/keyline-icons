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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 15L4 15C2.8954 15 2 14.1046 2 13C2 10.2386 4.2386 8 7 8L12 8L17 8C19.7614 8 22 10.2386 22 13C22 14.1046 21.1046 15 20 15ZM10.3828 17L13.6172 17L13.2577 19.876C13.1892 20.424 13.5779 20.9238 14.126 20.9923C14.674 21.0608 15.1738 20.6721 15.2423 20.124L15.6328 17L19.2807 17L18.2541 21.1063C17.976 22.2192 16.976 23 15.8288 23L8.1712 23C7.024 23 6.024 22.2192 5.7458 21.1063L4.7193 17L8.3672 17L8.7577 20.124C8.8262 20.6721 9.326 21.0608 9.874 20.9923C10.4221 20.9238 10.8108 20.424 10.7423 19.876Z" fill="currentColor" stroke="none"/>
      <path d="M12 9L12 6"/>
      <path d="M13 2C13 2.5523 12.5523 3 12 3C11.4477 3 11 2.5523 11 2C11 1.4477 11.4477 1 12 1C12.5523 1 13 1.4477 13 2Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
