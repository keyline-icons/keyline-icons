import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TruckOff({ size = 24, ...props }: IconProps) {
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
      <path d="M15 9L15 9.3431L14 9.3431L14 10.3431L7.6569 4L8.6569 4L8.6569 3L14 3C14.5523 3 15 3.4477 15 4L15 7L17.8284 7C18.0936 7 18.348 7.1054 18.5355 7.2929L22.7071 11.4645C22.8946 11.652 23 11.9064 23 12.1716L23 17.3431L21 17.3431L21 12.5858L17.4142 9L15 9ZM14 18L14 19L9.829 19C9.4049 20.1987 8.2715 21 7 21C5.7285 21 4.5951 20.1987 4.171 19L2 19C1.4477 19 1 18.5523 1 18L1 4C1 3.4477 1.4477 3 2 3L4 3L4 4L14 14.0001L15 14.0001L15 15.7638C15.228 15.5598 15.4858 15.3918 15.7645 15.2656L16.5889 17.0878C16.2303 17.2496 15.9999 17.6064 15.9999 17.9997C15.9999 18.5522 16.4478 19.0001 17.0003 19.0001C17.3936 19.0001 17.7504 18.7697 17.9122 18.4111L19.7344 19.2355C19.249 20.3099 18.1793 21.0005 17.0002 21.0005C15.3432 21.0005 13.9999 19.6571 14 18ZM8 18C8 17.4475 7.5522 16.9997 6.9997 16.9997C6.4473 16.9997 5.9995 17.4475 5.9995 17.9999C5.9995 18.5523 6.4473 19.0002 6.9997 19.0002C7.2651 19.0002 7.5195 18.8948 7.7071 18.7071C7.8946 18.5206 8 18.2671 8 18.0026C8 18.0018 8 18.0009 8 18Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
