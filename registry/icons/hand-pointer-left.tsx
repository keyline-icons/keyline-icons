import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandPointerLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M10.7081 11.3411L3.2808 10.0066C2.432 9.8541 1.8711 9.0731 2.0256 8.2588C2.1807 7.4413 2.9979 6.8991 3.851 7.0478L13.0124 8.6441C13.4989 8.7288 13.8007 8.1321 13.4442 7.7905L11.7985 6.2134C11.3308 5.7652 11.2698 5.0587 11.6542 4.543C12.0676 3.9884 12.8584 3.8353 13.4641 4.1924L16.0291 5.7051C22.1904 8.9257 22.1904 12.6831 21.9102 14.8301C20.7899 20.7345 11.8283 20.4661 10.428 19.3926C9.0278 18.3191 10.453 17.1966 11.0129 17.1966M7.9076 10.8379L7.7687 12.2681C7.689 13.1075 8.2983 13.8637 9.1659 14.0023L10.9881 14.2934M11.2682 17.2456L9.5188 16.9103C8.8953 16.7908 8.4282 16.2925 8.3706 15.6857C8.2811 14.7425 9.2245 13.9351 10.1834 14.1648" fill="none"/>
    </svg>
  )
}
