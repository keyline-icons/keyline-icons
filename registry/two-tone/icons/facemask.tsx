import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Facemask({ size = 24, ...props }: IconProps) {
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
      <path d="M9.8809 5.74C11.133 4.75 12.868 4.75 14.1201 5.74L15.9531 7.19C16.2131 7.39 16.5218 7.5 16.833 7.5H20.5C21.8807 7.5 23 8.62 23 10V11.5C23 13.71 21.2092 15.5 19 15.5H17.5264C17.123 16.23 16.6088 16.89 15.9941 17.43C13.7154 19.45 10.5629 19.51 8.2295 17.62L8.0059 17.43C7.3915 16.89 6.8771 16.23 6.4736 15.5H5C2.7908 15.5 1 13.71 1 11.5V10C1 8.62 2.1193 7.5 3.5 7.5H7.167C7.4782 7.5 7.7869 7.39 8.0469 7.19L9.8809 5.74Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 14.5H5C3.3431 14.5 2 13.16 2 11.5V10C2 9.17 2.6716 8.5 3.5 8.5H7.1667C7.7076 8.5 8.2339 8.32 8.6667 7.97L10.5 6.53C11.3889 5.82 12.6111 5.82 13.5 6.53L15.3333 7.97C15.7661 8.32 16.2924 8.5 16.8333 8.5H20.5C21.3284 8.5 22 9.17 22 10V11.5C22 13.16 20.6569 14.5 19 14.5H17M6 8.5L6.5128 12.44C6.7335 14.13 7.5075 15.66 8.6689 16.68C10.6429 18.43 13.3571 18.43 15.331 16.68C16.4925 15.66 17.2665 14.13 17.4873 12.44L18 8.5M12 11V14"/>
    </svg>
  )
}
