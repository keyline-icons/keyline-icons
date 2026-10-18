import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function OctagonDot({ size = 24, ...props }: IconProps) {
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
      <path d="M14.5645 2C15.4927 2 16.3827 2.369 17.0391 3.0254L20.9746 6.9609C21.631 7.6173 22 8.5073 22 9.4355L22 14.5645C22 15.4927 21.631 16.3827 20.9746 17.0391L17.0391 20.9746C16.3827 21.631 15.4927 22 14.5645 22L9.4355 22C8.5073 22 7.6173 21.631 6.9609 20.9746L3.0254 17.0391C2.369 16.3827 2 15.4927 2 14.5645L2 9.4355C2 8.5073 2.369 7.6173 3.0254 6.9609L6.9609 3.0254C7.6173 2.369 8.5073 2 9.4355 2L14.5645 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 14.5645L3 9.4355C3 8.7725 3.2634 8.1366 3.7322 7.6678L7.6678 3.7322C8.1366 3.2634 8.7725 3 9.4355 3L14.5645 3C15.2275 3 15.8634 3.2634 16.3322 3.7322L20.2678 7.6678C20.7366 8.1366 21 8.7725 21 9.4355L21 14.5645C21 15.2275 20.7366 15.8634 20.2678 16.3322L16.3322 20.2678C15.8634 20.7366 15.2275 21 14.5645 21L9.4355 21C8.7725 21 8.1366 20.7366 7.6678 20.2678L3.7322 16.3322C3.2634 15.8634 3 15.2275 3 14.5645Z" fill="none"/>
      <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
