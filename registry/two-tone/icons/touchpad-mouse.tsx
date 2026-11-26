import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TouchpadMouse({ size = 24, ...props }: IconProps) {
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
      <path d="M21.5355 21.5355C20.6318 22.4392 19.3804 23 18 23C15.2386 23 13 20.7614 13 18L13 14C13 11.2386 15.2386 9 18 9C20.7614 9 23 11.2386 23 14L23 18C23 19.3804 22.4392 20.6318 21.5355 21.5355Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 16H5C3.3431 16 2 14.6569 2 13V5C2 3.3431 3.3431 2 5 2H17C18.6569 2 20 3.3431 20 5V6M18 10C20.2091 10 22 11.7909 22 14V18C22 20.2091 20.2091 22 18 22C15.7909 22 14 20.2091 14 18V14C14 11.7909 15.7909 10 18 10ZM18 14V15"/>
    </svg>
  )
}
