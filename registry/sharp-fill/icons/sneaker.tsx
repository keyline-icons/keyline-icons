import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sneaker({ size = 24, ...props }: IconProps) {
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
      <path d="M14.469 8.45C14.526 8.51 14.588 8.56 14.653 8.6L14.972 8.82L14.395 9.44L15.863 10.8L16.659 9.94L18.408 11.1L15.91 13.79L17.377 15.15L19.291 13.09L20.092 12.23C21.917 13.51 22.999 15.65 22.999 17.94C22.999 19.02 22.161 20 20.999 20H7.819L7.821 19C7.82 16.94 6.894 15.49 5.738 14.57C4.617 13.67 3.293 13.27 2.386 13.16L1.379 13.04L1.784 9.15C1.835 8.91 1.985 8.64 2.185 8.5C2.414 8.33 2.704 8.27 2.981 8.33L7.659 9.32L10.801 7.47L8.832 5.37L10.289 4L14.469 8.45ZM11.861 12.18L13.33 13.54L15.86 10.8L14.39 9.44L11.861 12.18ZM2.151 15.14C2.761 15.22 3.714 15.51 4.49 16.13C5.231 16.73 5.82 17.62 5.821 19L5.819 19.96L1.955 19.78C1.688 19.77 1.437 19.65 1.258 19.46C1.078 19.26 0.986 18.99 1.002 18.73L1.215 15.03L2.151 15.14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
