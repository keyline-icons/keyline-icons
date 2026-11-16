import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LayerBoxes({ size = 24, ...props }: IconProps) {
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
      <path d="M11.634 1.069C11.908 0.961 12.219 0.98 12.481 1.124L22.481 6.624C22.801 6.8 23 7.135 23 7.5V16.5C23 16.865 22.801 17.2 22.481 17.376L12.481 22.876C12.182 23.041 11.818 23.041 11.519 22.876L1.519 17.376C1.199 17.2 1 16.865 1 16.5V7.5C1 7.135 1.199 6.8 1.519 6.624L11.519 1.124L11.634 1.069Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M23 12.591L12.481 18.376C12.181 18.541 11.818 18.541 11.518 18.376L1 12.591V10.309L11.999 16.358L23 10.309V12.591Z" fill="currentColor"/>
      <path d="M11.634 1.069C11.908 0.961 12.219 0.98 12.481 1.124L22.481 6.624C22.801 6.8 23 7.135 23 7.5C23 7.865 22.801 8.2 22.481 8.376L12.481 13.876C12.182 14.041 11.818 14.041 11.519 13.876L1.519 8.376C1.199 8.2 1 7.865 1 7.5C1 7.135 1.199 6.8 1.519 6.624L11.519 1.124L11.634 1.069Z" fill="currentColor"/>
    </svg>
  )
}
