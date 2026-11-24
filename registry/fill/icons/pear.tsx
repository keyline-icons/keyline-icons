import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pear({ size = 24, ...props }: IconProps) {
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
      <path d="M16.4961 7.1522C16.6383 7.97 17.032 8.7252 17.6247 9.3112C19.1447 10.8139 20 12.8626 20 15C20 19.4182 16.4183 23 12 23C9.7911 23 7.7898 22.1034 6.3431 20.6568C4.8965 19.2102 4 17.2088 4 15C4 12.8626 4.8553 10.8139 6.3753 9.3112C7.0158 8.6779 7.4239 7.847 7.5334 6.953C7.81 4.6962 9.7265 3.0004 12 3.0004C12.3783 3.0004 12.7472 3.0475 13.1005 3.1365C13.8612 2.0171 15.1434 1.2939 16.5786 1.2939C17.7981 1.2939 18.9576 1.8235 19.756 2.7455C19.9134 2.9273 20 3.1597 20 3.4001C20 3.4415 19.9974 3.483 19.9923 3.5241C19.8609 4.5757 19.3474 5.4971 18.6033 6.154C18.0202 6.6689 17.2933 7.023 16.4961 7.1522ZM17.2796 4.6547C17.558 4.4089 17.774 4.0941 17.9002 3.7343C17.5223 3.4509 17.0594 3.2939 16.5786 3.2939C15.6432 3.2939 14.8296 3.8808 14.5144 4.7252C14.5094 4.7387 14.5045 4.7522 14.4997 4.7658C14.7696 4.9682 15.0827 5.1061 15.4148 5.1685C15.5478 5.1934 15.6838 5.2063 15.8214 5.2063C16.3772 5.2063 16.8884 5.0001 17.2796 4.6547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 4.0004C12 2.8004 11.8 2 11 2"/>
    </svg>
  )
}
