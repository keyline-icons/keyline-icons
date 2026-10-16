import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleNavigation({ size = 24, ...props }: IconProps) {
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
      <path d="M20 19C21.2982 17.269 22 15.1637 22 13C22 7.4772 17.5229 3 12 3C6.4772 3 2 7.4772 2 13C2 15.1637 2.7018 17.269 4 19"/>
      <path d="M8.1312 19.3647L11.1113 13.5654C11.4986 12.8115 12.5014 12.8115 12.8887 13.5654L15.8688 19.3647C16.3118 20.2268 15.5616 21.2346 14.6879 20.9513L12.2921 20.1742C12.1016 20.1124 11.8984 20.1124 11.7079 20.1742L9.3121 20.9513C8.4384 21.2346 7.6882 20.2268 8.1312 19.3647Z" fill="currentColor" stroke="none"/>
      <path d="M8.1312 19.3647L11.1113 13.5654C11.4986 12.8115 12.5014 12.8115 12.8887 13.5654L15.8688 19.3647C16.3118 20.2268 15.5616 21.2346 14.6879 20.9513L12.2921 20.1742C12.1016 20.1124 11.8984 20.1124 11.7079 20.1742L9.3121 20.9513C8.4384 21.2346 7.6882 20.2268 8.1312 19.3647Z"/>
    </svg>
  )
}
