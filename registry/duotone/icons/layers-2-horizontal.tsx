import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Layers2Horizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M14.761 1.981C15.561 0.63 17.595 0.675 18.312 2.116L22.792 11.116C23.069 11.673 23.069 12.327 22.792 12.884L18.312 21.884C17.595 23.325 15.561 23.37 14.761 22.019L14.687 21.884L10.208 12.884C9.931 12.327 9.931 11.673 10.208 11.116L14.687 2.116L14.761 1.981Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M5.761 1.982C6.561 0.63 8.595 0.675 9.313 2.116L10.664 4.831C10.801 5.11 10.8 5.437 10.661 5.716L8.417 10.226C7.861 11.344 7.861 12.657 8.417 13.775L10.663 18.289C10.8 18.568 10.799 18.895 10.66 19.174L9.313 21.884C8.595 23.325 6.561 23.37 5.761 22.019L5.688 21.884L1.208 12.884C0.931 12.327 0.931 11.673 1.208 11.116L5.688 2.116L5.761 1.982Z" fill="currentColor"/>
    </svg>
  )
}
