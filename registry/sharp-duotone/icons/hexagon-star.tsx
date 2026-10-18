import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HexagonStar({ size = 24, ...props }: IconProps) {
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
      <path d="M12.4362 1.1002L22.4362 5.9479C22.781 6.115 23 6.4645 23 6.8477L23 17.1523C23 17.5355 22.781 17.885 22.4362 18.0521L12.4362 22.8998C12.1607 23.0334 11.8393 23.0334 11.5638 22.8998L1.5638 18.0521C1.219 17.885 1 17.5355 1 17.1523L1 6.8477C1 6.4645 1.219 6.115 1.5638 5.9479L11.5638 1.1002C11.8393 0.9666 12.1607 0.9666 12.4362 1.1002Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11.7693 6.6536C11.8082 6.5606 11.8992 6.5 12 6.5C12.1009 6.5 12.1918 6.5606 12.2307 6.6536L13.4938 9.678L16.7699 9.9395C16.8998 9.9499 17 10.0584 17 10.1887C17 10.2619 16.9679 10.3314 16.9123 10.3789L14.417 12.5076L15.1797 15.6918C15.1842 15.7108 15.1865 15.7304 15.1865 15.75C15.1865 15.8881 15.0746 16 14.9365 16C14.8907 16 14.8458 15.9874 14.8066 15.9636L12 14.2564L9.1934 15.9636C9.1543 15.9874 9.1093 16 9.0635 16C8.9254 16 8.8135 15.8881 8.8135 15.75C8.8135 15.7304 8.8158 15.7108 8.8204 15.6918L9.5831 12.5076L7.0878 10.3789C7.0321 10.3314 7 10.2619 7 10.1887C7 10.0584 7.1002 9.9499 7.2301 9.9395L10.5062 9.678L11.7693 6.6536Z" fill="none"/>
    </svg>
  )
}
