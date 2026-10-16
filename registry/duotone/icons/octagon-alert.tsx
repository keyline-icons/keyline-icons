import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function OctagonAlert({ size = 24, ...props }: IconProps) {
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
      <path d="M14.5645 2C15.4927 2 16.3827 2.36902 17.0391 3.02539L20.9746 6.96094C21.631 7.61731 22 8.50729 22 9.43555V14.5645C22 15.4927 21.631 16.3827 20.9746 17.0391L17.0391 20.9746C16.3827 21.631 15.4927 22 14.5645 22H9.43555C8.50729 22 7.61731 21.631 6.96094 20.9746L3.02539 17.0391C2.36902 16.3827 2 15.4927 2 14.5645V9.43555C2 8.50729 2.36902 7.61731 3.02539 6.96094L6.96094 3.02539C7.61731 2.36902 8.50729 2 9.43555 2H14.5645Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 8V12"/>
      <path d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
