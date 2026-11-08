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
      <path d="M22.999 17.94C22.999 19.02 22.161 20 20.999 20H6.821C6.806 20 6.791 20 6.776 20L1.955 19.78C1.688 19.77 1.437 19.65 1.258 19.46C1.078 19.26 0.986 18.99 1.002 18.73L1.269 14.1C1.27 14.08 1.272 14.07 1.273 14.05L1.784 9.15C1.836 8.91 1.985 8.64 2.185 8.5C2.415 8.33 2.704 8.27 2.981 8.33L7.659 9.32L10.801 7.47L8.832 5.37L10.289 4L14.469 8.45C14.526 8.51 14.588 8.56 14.653 8.6L19.967 12.14C21.869 13.41 22.999 15.6 22.999 17.94Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M2.271 14.15C3.041 14.25 4.171 14.6 5.111 15.35C6.061 16.11 6.821 17.28 6.821 19V20L1.961 19.78C1.691 19.77 1.441 19.65 1.261 19.46C1.081 19.26 0.991 18.99 1.001 18.73L1.271 14.1C1.271 14.08 1.271 14.07 1.281 14.05V14.03L2.271 14.15ZM19.97 12.14C20.012 12.17 20.052 12.2 20.093 12.23L19.293 13.09L17.378 15.15L15.912 13.79L18.41 11.1L19.97 12.14Z" fill="currentColor"/>
      <path d="M15.862 10.8L13.331 13.54L11.863 12.18L14.392 9.44L15.862 10.8Z" fill="currentColor"/>
      <path d="M16.662 9.94L15.865 10.8L14.397 9.44L14.974 8.82L16.662 9.94Z" fill="currentColor"/>
    </svg>
  )
}
