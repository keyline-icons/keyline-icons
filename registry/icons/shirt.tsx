import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Shirt({ size = 24, ...props }: IconProps) {
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
      <path d="M15 2L19.649 3.6905C20.1899 3.8872 20.6199 4.3074 20.8289 4.8437L21.9316 7.672C22.1156 8.1442 21.9173 8.6795 21.47 8.9178L19.0041 10.2315C18.6917 10.3979 18.4906 10.717 18.4752 11.0706L18.0832 20.0869C18.0367 21.1566 17.1558 22 16.0851 22L7.9149 22C6.8442 22 5.9633 21.1566 5.9168 20.0869L5.5248 11.0706C5.5094 10.717 5.3083 10.3979 4.9959 10.2315L2.53 8.9178C2.0827 8.6795 1.8844 8.1442 2.0684 7.672L3.1711 4.8437C3.3801 4.3074 3.8101 3.8872 4.351 3.6905L9 2C9 3.6569 10.3431 5 12 5C13.6569 5 15 3.6569 15 2Z"/>
    </svg>
  )
}
