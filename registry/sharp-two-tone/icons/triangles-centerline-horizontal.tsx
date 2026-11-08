import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrianglesCenterlineHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M16.224 15C16.597 15 16.939 15.21 17.111 15.54C17.283 15.87 17.256 16.27 17.041 16.58L12.818 22.58C12.631 22.84 12.325 23 12 23C11.675 23 11.37 22.84 11.183 22.58L6.96 16.58C6.745 16.27 6.718 15.87 6.89 15.54C7.062 15.21 7.404 15 7.777 15H16.224ZM23 13H1V11H23V13ZM12 1C12.325 1 12.631 1.16 12.818 1.42L17.041 7.42C17.256 7.73 17.283 8.13 17.111 8.46C16.939 8.79 16.597 9 16.224 9H7.777C7.404 9 7.062 8.79 6.89 8.46C6.718 8.13 6.745 7.73 6.96 7.42L11.183 1.42C11.37 1.16 11.675 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M23 12H1M12 2L7.777 8H16.223L12 2ZM12 22L7.777 16H16.223L12 22Z"/>
    </svg>
  )
}
