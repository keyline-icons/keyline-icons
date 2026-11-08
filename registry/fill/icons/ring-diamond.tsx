import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RingDiamond({ size = 24, ...props }: IconProps) {
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
      <path d="M13.5186 1C14.126 1 14.7015 1.28 15.0811 1.75L16.3555 3.34C16.868 3.99 16.9369 4.87 16.5303 5.59L15.418 7.53C15.3904 7.58 15.384 7.64 15.4004 7.69C15.4168 7.74 15.4551 7.78 15.5049 7.81L15.5615 7.84C15.5637 7.84 15.5661 7.84 15.5684 7.84C18.1954 9.15 20 11.86 20 15C20 19.42 16.4183 23 12 23C7.5817 23 4 19.42 4 15C4 11.97 5.6911 9.33 8.1807 7.97C8.2422 7.94 8.2821 7.88 8.2852 7.81C8.2883 7.74 8.3288 7.67 8.3955 7.64C8.4447 7.61 8.482 7.57 8.498 7.52C8.5141 7.46 8.5078 7.41 8.4805 7.36L7.4688 5.59C7.0623 4.87 7.1314 3.99 7.6436 3.34L8.9189 1.75C9.2984 1.28 9.8731 1 10.4805 1H13.5186ZM12 9C8.6863 9 6 11.69 6 15C6 18.31 8.6863 21 12 21C15.3137 21 18 18.31 18 15C18 11.69 15.3137 9 12 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
