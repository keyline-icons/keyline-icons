import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShowerHead({ size = 24, ...props }: IconProps) {
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
      <path d="M7 13C6.9993 10.3832 8.4584 7.9845 10.7825 6.7819C11.7768 6.2672 12.8802 5.9986 13.9999 5.9986C16.2323 5.9986 18.3308 7.0635 19.6489 8.8653C20.5286 10.0642 21.002 11.5129 21 13C21 13.5523 20.5523 14 20 14L8 14C7.4477 14 7 13.5523 7 13Z" fill="currentColor" stroke="none"/>
      <path d="M4 23L4 7C4 4.2386 6.2386 2 9 2C11.7614 2 14 4.2386 14 7" fill="none"/>
      <path d="M11 17C11 17.5523 10.5523 18 10 18C9.4477 18 9 17.5523 9 17C9 16.4477 9.4477 16 10 16C10.5523 16 11 16.4477 11 17ZM15 17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17C13 16.4477 13.4477 16 14 16C14.5523 16 15 16.4477 15 17ZM19 17C19 17.5523 18.5523 18 18 18C17.4477 18 17 17.5523 17 17C17 16.4477 17.4477 16 18 16C18.5523 16 19 16.4477 19 17ZM13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21ZM17 21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21C15 20.4477 15.4477 20 16 20C16.5523 20 17 20.4477 17 21Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
