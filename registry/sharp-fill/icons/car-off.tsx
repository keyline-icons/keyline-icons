import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarOff({ size = 24, ...props }: IconProps) {
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
      <path d="M15.1715 18L7.7321 18C7.9076 17.696 8 17.3511 8 17C8 15.8954 7.1046 15 6 15C4.8954 15 4 15.8954 4 17C4 17.3511 4.0924 17.696 4.2679 18L2 18C1.4477 18 1 17.5523 1 17L1 13C1 12.8925 1.0173 12.7858 1.0513 12.6838L3.2523 6.0808L3.7179 4.6838C3.7926 4.4596 3.9443 4.2691 4.1461 4.1461L5.9999 6L5.7477 6C5.5351 6 5.3458 6.1344 5.2757 6.3351L4.3874 9L7.5045 9C7.7788 8.9975 7.9999 8.7744 7.9999 8.5L8 8L15.5858 15.5858C15.2106 15.9608 14.9998 16.4695 14.9998 17C14.9998 17.3511 15.0922 17.696 15.2678 18L15.1715 18ZM7.6569 4L13 4C13.2869 4 13.56 4.1232 13.7498 4.3384L18.5717 9.8031L22.3162 11.0513C22.7246 11.1874 23 11.5696 23 12L23 17C23 17.5523 22.5523 18 22 18L21.6569 18L12.6569 9L15.2328 9L12.5858 6L10 6L10 6.3431L7.6569 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8 17C8 18.1046 7.1046 19 6 19C4.8954 19 4 18.1046 4 17C4 15.8954 4.8954 15 6 15C7.1046 15 8 15.8954 8 17ZM18.4142 18.4142C18.0523 18.7761 17.5523 19 17 19C15.8954 19 15 18.1046 15 17C15 16.4477 15.2239 15.9477 15.5858 15.5858M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
