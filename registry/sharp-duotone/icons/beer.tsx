import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Beer({ size = 24, ...props }: IconProps) {
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
      <path d="M11 1C12.297 1 13.458 1.62 14.19 2.588L14.331 2.786L14.615 3.243C15.01 3.115 15.578 3 16 3C18.209 3 20 4.791 20 7C20 8.422 19.186 9.746 18 10.459V11C20.155 11.061 22 12.83 22 15C22 17.17 20.155 18.938 18 18.999V22.042C17.944 22.541 17.514 23 17 23H5C4.486 23 4.056 22.532 4 22.033V10.461L3.776 10.322L3.577 10.18C2.602 9.437 2 8.271 2 7C2 4.791 3.791 3 6 3C6.447 3 6.967 3.103 7.383 3.246L7.668 2.786C8.387 1.705 9.617 1 11 1ZM18 17.001C19.045 16.935 20 16.062 20 15C20 13.938 19.045 13.064 18 12.998V17.001Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M17 8.828C17.552 8.828 18 9.276 18 9.828V22.042C17.944 22.541 17.514 23 17 23H5C4.486 23 4.056 22.541 4 22.042V9.828C4 9.276 4.448 8.828 5 8.828H17ZM8 13V19H10V13H8ZM12 13V19H14V13H12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
